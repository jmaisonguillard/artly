<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Commission;
use App\Models\CommissionMessage;
use App\Models\CommissionMessageAttachment;
use App\Models\CommissionFile;
use App\Models\CommissionMilestone;
use App\Models\CommissionRevision;
use App\Models\CommissionPayment;
use Illuminate\Support\Facades\Storage;

class CommissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure we have users to work with
        $this->ensureUsersExist();

        // Create dummy storage directories if they don't exist
        $this->createStorageDirectories();

        // Create commissions in different states
        $this->createCommissions();
    }

    /**
     * Ensure we have users to work with
     */
    private function ensureUsersExist(): void
    {
        // Create artists if we don't have enough
        $artistCount = User::where('role', 'artist')->count();
        if ($artistCount < 5) {
            User::factory()
                ->count(5 - $artistCount)
                ->create(['role' => 'artist']);
        }

        // Create clients if we don't have enough
        $clientCount = User::where('role', 'client')->count();
        if ($clientCount < 10) {
            User::factory()
                ->count(10 - $clientCount)
                ->create(['role' => 'client']);
        }
    }

    /**
     * Create storage directories for file uploads
     */
    private function createStorageDirectories(): void
    {
        $directories = [
            'commission-files',
            'message-attachments',
            'thumbnails',
        ];

        foreach ($directories as $dir) {
            if (!Storage::exists($dir)) {
                Storage::makeDirectory($dir);
            }
        }
    }

    /**
     * Create commissions in different states
     */
    private function createCommissions(): void
    {
        // Create in progress commissions
        $this->createCommissionsInProgress();

        // Create completed commissions
        $this->createCompletedCommissions();

        // Create pending approval commissions
        $this->createPendingApprovalCommissions();

        // Create pending commissions
        $this->createPendingCommissions();

        // Create cancelled commissions
        $this->createCancelledCommissions();
    }

    /**
     * Create commissions in progress
     */
    private function createCommissionsInProgress(): void
    {
        Commission::factory()
            ->count(10)
            ->inProgress()
            ->create()
            ->each(function ($commission) {
                // Create milestones
                $this->createMilestonesForCommission($commission);

                // Create messages
                $this->createMessagesForCommission($commission, 5, 10);

                // Create files
                $this->createFilesForCommission($commission, 3, 6);

                // Create revisions if any used
                if ($commission->revisions_used > 0) {
                    $this->createRevisionsForCommission($commission);
                }

                // Create payments
                $this->createPaymentsForCommission($commission);
            });
    }

    /**
     * Create completed commissions
     */
    private function createCompletedCommissions(): void
    {
        Commission::factory()
            ->count(5)
            ->completed()
            ->create()
            ->each(function ($commission) {
                // Create milestones
                $this->createMilestonesForCommission($commission, true);

                // Create messages
                $this->createMessagesForCommission($commission, 7, 15);

                // Create files
                $this->createFilesForCommission($commission, 5, 10);

                // Create revisions if any used
                if ($commission->revisions_used > 0) {
                    $this->createRevisionsForCommission($commission, true);
                }

                // Create payments
                $this->createPaymentsForCommission($commission, true);
            });
    }

    /**
     * Create pending approval commissions
     */
    private function createPendingApprovalCommissions(): void
    {
        Commission::factory()
            ->count(3)
            ->pendingApproval()
            ->create()
            ->each(function ($commission) {
                // Create milestones
                $this->createMilestonesForCommission($commission);

                // Create messages
                $this->createMessagesForCommission($commission, 3, 8);

                // Create files
                $this->createFilesForCommission($commission, 2, 5);

                // Create revisions if any used
                if ($commission->revisions_used > 0) {
                    $this->createRevisionsForCommission($commission);
                }

                // Create payments
                $this->createPaymentsForCommission($commission);
            });
    }

    /**
     * Create pending commissions
     */
    private function createPendingCommissions(): void
    {
        Commission::factory()
            ->count(3)
            ->create([
                'status' => 'pending',
                'stage' => 'concept',
                'progress' => 0,
            ])
            ->each(function ($commission) {
                // Create initial milestones
                $this->createMilestonesForCommission($commission);

                // Create initial message from client
                CommissionMessage::factory()
                    ->count(1)
                    ->create([
                        'commission_id' => $commission->id,
                        'user_id' => $commission->client_id,
                        'sender_type' => 'client',
                        'content' => "I've created this commission for \"{$commission->title}\". Looking forward to working with you!",
                    ]);
            });
    }

    /**
     * Create cancelled commissions
     */
    private function createCancelledCommissions(): void
    {
        Commission::factory()
            ->count(2)
            ->create([
                'status' => 'cancelled',
                'progress' => random_int(10, 70),
            ])
            ->each(function ($commission) {
                // Create milestones
                $this->createMilestonesForCommission($commission);

                // Create messages
                $this->createMessagesForCommission($commission, 3, 8);

                // Create cancellation message
                CommissionMessage::factory()
                    ->create([
                        'commission_id' => $commission->id,
                        'user_id' => fake()->randomElement([$commission->client_id, $commission->artist_id]),
                        'sender_type' => fake()->randomElement(['client', 'artist']),
                        'content' => "I'm sorry, but I need to cancel this commission due to " . fake()->randomElement([
                            "changing project requirements",
                            "timeline constraints",
                            "budget adjustments",
                            "personal circumstances",
                            "changing priorities",
                        ]) . ". Thank you for understanding.",
                    ]);

                // Create files
                $this->createFilesForCommission($commission, 1, 4);
            });
    }

    /**
     * Create milestones for a commission
     */
    private function createMilestonesForCommission(Commission $commission, bool $allCompleted = false): void
    {
        $milestoneCount = 5;

        // Default milestone data
        $milestones = [
            [
                'title' => 'Initial Concept Approval',
                'description' => 'Review and approve the initial concept and ideas',
            ],
            [
                'title' => 'Sketch Approval',
                'description' => 'Review and approve the rough sketch and composition',
            ],
            [
                'title' => 'Lineart Approval',
                'description' => 'Review and approve the final lineart before coloring',
            ],
            [
                'title' => 'Color and Shading Approval',
                'description' => 'Review and approve colors, lighting and shading',
            ],
            [
                'title' => 'Final Delivery',
                'description' => 'Final artwork delivery and project completion',
            ],
        ];

        // Calculate due dates
        $commissionStartDate = $commission->created_at;
        $commissionEndDate = $commission->due_date;
        $totalDays = $commissionStartDate->diff($commissionEndDate)->days;
        $daysPerMilestone = max(1, floor($totalDays / $milestoneCount));

        for ($i = 0; $i < $milestoneCount; $i++) {
            $dueDateDays = $daysPerMilestone * ($i + 1);
            $dueDate = (clone $commissionStartDate)->modify("+{$dueDateDays} days");

            $completed = false;
            $completedAt = null;

            if ($allCompleted) {
                // All milestones are completed
                $completed = true;
                $completedAt = fake()->dateTimeBetween($commissionStartDate, $commission->updated_at);
            } else {
                // Progress-based completion
                $progressThresholds = [
                    0 => 20,  // First milestone complete at 20% progress
                    1 => 40,  // Second milestone complete at 40% progress
                    2 => 65,  // Third milestone complete at 65% progress
                    3 => 90,  // Fourth milestone complete at 90% progress
                    4 => 100, // Fifth milestone complete at 100% progress
                ];

                if ($commission->progress >= $progressThresholds[$i]) {
                    $completed = true;
                    $completedAt = fake()->dateTimeBetween($commissionStartDate, $commission->updated_at);
                }
            }

            CommissionMilestone::create([
                'commission_id' => $commission->id,
                'title' => $milestones[$i]['title'],
                'description' => $milestones[$i]['description'],
                'completed' => $completed,
                'completed_at' => $completedAt,
                'due_date' => $dueDate,
                'order' => $i + 1,
            ]);
        }
    }

    /**
     * Create messages for a commission
     */
    private function createMessagesForCommission(Commission $commission, int $min = 3, int $max = 10): void
    {
        $messageCount = fake()->numberBetween($min, $max);

        // First message from client
        CommissionMessage::factory()
            ->create([
                'commission_id' => $commission->id,
                'user_id' => $commission->client_id,
                'sender_type' => 'client',
                'content' => "Hi! I'm excited to work with you on this {$commission->title} commission. Here are the details of what I'm looking for...",
                'created_at' => $commission->created_at,
            ]);

        // Artist response
        CommissionMessage::factory()
            ->create([
                'commission_id' => $commission->id,
                'user_id' => $commission->artist_id,
                'sender_type' => 'artist',
                'content' => "Thank you for choosing me for your project! I'm excited to work on this with you. I'll start sketching some initial concepts and will update you soon.",
                'created_at' => (clone $commission->created_at)->modify('+1 day'),
            ]);

        // Rest of the messages
        for ($i = 2; $i < $messageCount; $i++) {
            // Alternate between client and artist
            $sender = $i % 2 === 0 ? 'client' : 'artist';
            $userId = $sender === 'client' ? $commission->client_id : $commission->artist_id;

            CommissionMessage::factory()
                ->create([
                    'commission_id' => $commission->id,
                    'user_id' => $userId,
                    'sender_type' => $sender,
                    'created_at' => fake()->dateTimeBetween($commission->created_at, 'now'),
                ]);
        }
    }

    /**
     * Create files for a commission
     */
    private function createFilesForCommission(Commission $commission, int $min = 3, int $max = 8): void
    {
        $fileCount = fake()->numberBetween($min, $max);

        // Determine which stages should have files based on current stage
        $stages = ['concept', 'sketch', 'lineart', 'coloring', 'final'];
        $currentStageIndex = array_search($commission->stage, $stages);
        $availableStages = array_slice($stages, 0, $currentStageIndex + 1);

        // Create files for available stages
        foreach ($availableStages as $stage) {
            // 1-3 files per stage
            $stageFileCount = fake()->numberBetween(1, 3);

            for ($i = 0; $i < $stageFileCount; $i++) {
                // Determine if this is the current version for this stage
                $isCurrentVersion = ($stage === $commission->stage && $i === $stageFileCount - 1);

                // File extensions based on stage
                $stageExtensionMap = [
                    'concept' => ['jpg', 'png', 'pdf'],
                    'sketch' => ['jpg', 'png', 'psd'],
                    'lineart' => ['jpg', 'png', 'psd', 'ai'],
                    'coloring' => ['jpg', 'png', 'psd', 'ai'],
                    'final' => ['jpg', 'png', 'psd', 'ai', 'tif'],
                ];

                $extension = fake()->randomElement($stageExtensionMap[$stage]);
                $fileName = strtolower(str_replace(' ', '-', $commission->title)) . '-' . $stage . '-v' . ($i + 1) . '.' . $extension;

                // Create the file record (without actual file content in seeder)
                CommissionFile::create([
                    'commission_id' => $commission->id,
                    'uploaded_by' => $commission->artist_id, // Most files from artist
                    'name' => $fileName,
                    'path' => 'commission-files/' . $fileName,
                    'mime_type' => $this->getMimeType($extension),
                    'size' => fake()->numberBetween(50000, 5000000),  // 50KB - 5MB
                    'thumbnail_path' => 'thumbnails/' . $fileName,
                    'stage' => $stage,
                    'is_current_version' => $isCurrentVersion,
                    'created_at' => fake()->dateTimeBetween($commission->created_at, 'now'),
                ]);
            }
        }
    }

    /**
     * Get mime type from extension
     */
    private function getMimeType(string $extension): string
    {
        $mimeTypes = [
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'pdf' => 'application/pdf',
            'psd' => 'image/vnd.adobe.photoshop',
            'ai' => 'application/illustrator',
            'tif' => 'image/tiff',
        ];

        return $mimeTypes[$extension] ?? 'application/octet-stream';
    }

    /**
     * Create revisions for a commission
     */
    private function createRevisionsForCommission(Commission $commission, bool $allCompleted = false): void
    {
        // Create revisions based on revisions_used count
        for ($i = 0; $i < $commission->revisions_used; $i++) {
            $status = 'completed';

            // If this is the last revision and commission is not completed, it might be in progress
            if ($i === $commission->revisions_used - 1 && !$allCompleted && fake()->boolean(30)) {
                $status = 'in-progress';
            }

            // Alternate between client and artist for who requested the revision
            // In real world, most revisions would be requested by client, but for testing variety we'll alternate
            $requestedBy = ($i % 2 === 0) ? $commission->client_id : $commission->artist_id;

            // Generate realistic revision requests
            $revisionReasons = [
                'Could we adjust the colors to be more vibrant?',
                'The character\'s expression needs to be more intense.',
                'The proportions of the left arm seem a bit off.',
                'Can we change the background to something more natural?',
                'I\'d like the lighting to be more dramatic.',
                'The outfit details need some adjustments.',
                'Could you add more texture to the hair?',
                'The facial features need to be more defined.',
                'The composition would work better if the character was positioned differently.',
                'Can we make the overall mood darker/lighter?',
            ];

            CommissionRevision::create([
                'commission_id' => $commission->id,
                'request_details' => fake()->randomElement($revisionReasons),
                'requested_by' => $requestedBy,
                'status' => $status,
                'created_at' => fake()->dateTimeBetween($commission->created_at, 'now'),
            ]);

            // Create a related message for this revision
            CommissionMessage::create([
                'commission_id' => $commission->id,
                'user_id' => $requestedBy,
                'sender_type' => $requestedBy === $commission->client_id ? 'client' : 'artist',
                'content' => "I'd like to request a revision: " . fake()->randomElement($revisionReasons),
                'created_at' => fake()->dateTimeBetween($commission->created_at, 'now'),
            ]);
        }
    }

    /**
     * Create payments for a commission
     */
    private function createPaymentsForCommission(Commission $commission, bool $allCompleted = false): void
    {
        $totalPrice = $commission->price;

        // Basic payment structure:
        // 50% upfront, 50% on completion
        // For more complex commissions, could do 30% upfront, 30% at lineart, 40% on completion

        // Determine payment structure based on price
        $paymentStructure = [];

        if ($totalPrice >= 300) {
            // 3-part payment for higher value commissions
            $paymentStructure = [
                ['type' => 'initial', 'percentage' => 30],
                ['type' => 'milestone', 'percentage' => 30],
                ['type' => 'final', 'percentage' => 40],
            ];
        } else {
            // 2-part payment for standard commissions
            $paymentStructure = [
                ['type' => 'initial', 'percentage' => 50],
                ['type' => 'final', 'percentage' => 50],
            ];
        }

        // Create payment records
        foreach ($paymentStructure as $index => $payment) {
            $amount = ($payment['percentage'] / 100) * $totalPrice;
            $status = 'pending';
            $paidAt = null;

            // Initial payment is always completed
            if ($payment['type'] === 'initial') {
                $status = 'completed';
                $paidAt = $commission->created_at;
            }
            // Determine if other payments are completed based on commission progress
            else if ($allCompleted ||
                    ($payment['type'] === 'milestone' && $commission->progress >= 65) ||
                    ($payment['type'] === 'final' && $commission->progress >= 100)) {
                $status = 'completed';
                $paidAt = fake()->dateTimeBetween($commission->created_at, 'now');
            }

            // Payment descriptions
            $descriptions = [
                'initial' => 'Initial deposit for commission start',
                'milestone' => 'Progress payment at lineart completion',
                'final' => 'Final payment upon artwork completion',
            ];

            CommissionPayment::create([
                'commission_id' => $commission->id,
                'amount' => round($amount, 2),
                'type' => $payment['type'],
                'status' => $status,
                'description' => $descriptions[$payment['type']],
                'transaction_id' => $status === 'completed' ? 'TRANS-' . strtoupper(fake()->bothify('??####')) : null,
                'paid_at' => $paidAt,
                'created_at' => $commission->created_at,
            ]);
        }
    }
}
