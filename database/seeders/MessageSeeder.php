<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure we have users to work with
        if (User::count() < 5) {
            $this->command->info('Creating users for message testing...');
            User::factory()->count(5)->create();
        }

        $users = User::all();
        $this->command->info('Creating message threads and conversations...');

        // Create artist-client conversations
        $artists = $users->where('role', 'artist')->take(3)->values();
        $clients = $users->where('role', 'client')->take(3)->values();

        // If we don't have enough artists or clients, just use regular users
        if ($artists->count() < 3 || $clients->count() < 3) {
            $artists = $users->take(3);
            $clients = $users->skip(3)->take(3);
        }

        // Create a few sample threads between artists and clients
        foreach ($artists as $index => $artist) {
            foreach ($clients as $clientIndex => $client) {
                // Create a thread for each artist-client pair
                $this->createConversation($artist, $client, $index + $clientIndex);
            }
        }

        // Create a few random threads between any users
        for ($i = 0; $i < 5; $i++) {
            $user1 = $users->random();
            // Make sure we pick a different user for the second participant
            $user2 = $users->where('id', '!=', $user1->id)->random();

            $this->createConversation($user1, $user2, $i + 10);
        }

        $this->command->info('Finished creating ' . MessageThread::count() . ' message threads with ' . Message::count() . ' messages.');
    }

    /**
     * Create a conversation between two users
     */
    private function createConversation(User $user1, User $user2, int $scenarioSeed): void
    {
        // Generate a subject based on the scenario seed
        $subjects = [
            'Question about your artwork',
            'Commission inquiry',
            'Following up on our project',
            'New project opportunity',
            'Feedback on the artwork',
            'Payment confirmation',
            'Revision request',
            'Project timeline update',
            'Quick question about style',
            'Collaboration opportunity',
            'Reference images',
            'Final delivery confirmation',
            'Thank you for your work',
            'Portfolio inquiry',
            'Custom request',
        ];

        $subject = $subjects[$scenarioSeed % count($subjects)];

        // Create thread and add participants
        $thread = MessageThread::create([
            'subject' => $subject,
            'last_message_at' => now(),
        ]);

        // Add participants
        $thread->participants()->attach([
            $user1->id => ['last_read_at' => now()],
            $user2->id => ['last_read_at' => now()],
        ]);

        // Create conversation based on scenario seed
        switch ($scenarioSeed % 5) {
            case 0:
                $this->createCommissionInquiryConversation($thread, $user1, $user2);
                break;
            case 1:
                $this->createProjectUpdateConversation($thread, $user1, $user2);
                break;
            case 2:
                $this->createFeedbackConversation($thread, $user1, $user2);
                break;
            case 3:
                $this->createPaymentConversation($thread, $user1, $user2);
                break;
            case 4:
                $this->createGeneralInquiryConversation($thread, $user1, $user2);
                break;
        }

        // Update the last message time
        $thread->update(['last_message_at' => now()]);
    }

    /**
     * Create a commission inquiry conversation
     */
    private function createCommissionInquiryConversation(MessageThread $thread, User $client, User $artist): void
    {
        $createdAt = now()->subDays(rand(1, 30));

        // Client inquiry
        $message1 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $client->id,
            'recipient_id' => $artist->id,
            'content' => "Hi there! I really love your artwork style and I'm interested in commissioning a piece. Do you have any availability in the next few months? I'm looking for a digital illustration of my D&D character.",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(2),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Artist response
        $createdAt = $createdAt->copy()->addHours(5);
        $message2 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $artist->id,
            'recipient_id' => $client->id,
            'content' => "Hello! Thanks for reaching out. I'd be happy to work on your D&D character illustration. I currently have availability starting next month. Could you tell me more about your character and what kind of pose/scene you're envisioning?",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(1),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Client details
        $createdAt = $createdAt->copy()->addHours(8);
        $message3 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $client->id,
            'recipient_id' => $artist->id,
            'content' => "That's great news! My character is a half-elf druid named Thalia. She has long silver hair with flowers woven through it, green eyes, and usually wears nature-themed clothing in earthy tones. I'd love to see her in a forest setting, perhaps communing with animals or casting a nature spell. What are your rates for something like this?",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(3),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Artist pricing
        $createdAt = $createdAt->copy()->addDay();
        $message4 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $artist->id,
            'recipient_id' => $client->id,
            'content' => "Your character sounds wonderful! For a full-body illustration with a detailed background like a forest scene, my rate would be $150. This includes one round of revisions after the initial sketch approval. Does that work for you? If yes, I can send over my commission terms and we can get started!",
            'is_read' => rand(0, 1) == 1,
            'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(5) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // 50% chance of having an unfinished conversation
        if (rand(0, 1) == 1) {
            $createdAt = $createdAt->copy()->addDays(2);
            $message5 = Message::create([
                'thread_id' => $thread->id,
                'sender_id' => $client->id,
                'recipient_id' => $artist->id,
                'content' => "That rate works for me! Yes, please send over your commission terms. I'm excited to see your interpretation of Thalia. When do you think you could start working on it?",
                'is_read' => rand(0, 1) == 1,
                'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(1) : null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }

    /**
     * Create a project update conversation
     */
    private function createProjectUpdateConversation(MessageThread $thread, User $sender, User $recipient): void
    {
        $createdAt = now()->subDays(rand(5, 15));

        // Initial message
        $message1 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => "Hi! Just wanted to give you an update on the project. I've completed the initial sketch and wanted to share it with you for feedback before moving to the next stage.",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(1),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Response
        $createdAt = $createdAt->copy()->addHours(6);
        $message2 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $recipient->id,
            'recipient_id' => $sender->id,
            'content' => "Thanks for the update! I just checked out the sketch and it's looking great so far. I especially like how you captured the expression. Could we make the pose a bit more dynamic? Other than that, I'm happy with the direction.",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(2),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Update response
        $createdAt = $createdAt->copy()->addDays(2);
        $message3 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => "I'll work on making the pose more dynamic as suggested. I should have an updated sketch for you in the next couple of days. Thanks for the feedback!",
            'is_read' => rand(0, 1) == 1,
            'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(3) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);
    }

    /**
     * Create a feedback conversation
     */
    private function createFeedbackConversation(MessageThread $thread, User $artist, User $client): void
    {
        $createdAt = now()->subDays(rand(10, 20));

        // Initial message
        $message1 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $artist->id,
            'recipient_id' => $client->id,
            'content' => "Hello! I've just uploaded the final version of your commission to the platform. Please let me know if you're happy with the result or if there's anything you'd like me to adjust.",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(1),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Feedback
        $createdAt = $createdAt->copy()->addHours(8);
        $message2 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $client->id,
            'recipient_id' => $artist->id,
            'content' => "Wow, I'm absolutely in love with the final piece! You've exceeded my expectations. The colors are vibrant and the details are incredible. Thank you so much for bringing my character to life exactly as I imagined. I'll definitely be commissioning you again in the future!",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(2),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Thank you
        $createdAt = $createdAt->copy()->addDay();
        $message3 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $artist->id,
            'recipient_id' => $client->id,
            'content' => "I'm so happy to hear that you love the final piece! It was a pleasure bringing your character to life. I really enjoyed the creative freedom you gave me with the background elements. Thank you for being such a great client to work with, and I'd be thrilled to work with you again on future projects!",
            'is_read' => rand(0, 1) == 1,
            'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(4) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);
    }

    /**
     * Create a payment conversation
     */
    private function createPaymentConversation(MessageThread $thread, User $sender, User $recipient): void
    {
        $createdAt = now()->subDays(rand(3, 10));

        // Initial message
        $message1 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => "Hi there, I've reached the halfway point in your commission and according to our agreement, the second payment installment is now due. Could you please process this when you get a chance?",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(2),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Response
        $createdAt = $createdAt->copy()->addHours(5);
        $message2 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $recipient->id,
            'recipient_id' => $sender->id,
            'content' => "Of course! I've just processed the payment through the platform. You should receive confirmation shortly. The progress looks amazing so far, I'm really excited to see the finished piece!",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(1),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Thank you
        $createdAt = $createdAt->copy()->addHours(3);
        $message3 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => "Thank you for the prompt payment! I've received the confirmation. I'll continue working on your commission and should have the next update for you by the end of the week.",
            'is_read' => rand(0, 1) == 1,
            'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(6) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);
    }

    /**
     * Create a general inquiry conversation
     */
    private function createGeneralInquiryConversation(MessageThread $thread, User $sender, User $recipient): void
    {
        $createdAt = now()->subDays(rand(1, 7));

        // Initial message
        $message1 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => "Hello! I came across your profile and I'm really impressed with your portfolio. I was wondering if you offer tutorial sessions or if you have any learning resources you'd recommend for someone trying to develop a style similar to yours?",
            'is_read' => true,
            'read_at' => $createdAt->copy()->addHours(3),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // Response
        $createdAt = $createdAt->copy()->addDays(1);
        $message2 = Message::create([
            'thread_id' => $thread->id,
            'sender_id' => $recipient->id,
            'recipient_id' => $sender->id,
            'content' => "Hi there! Thanks for reaching out and for the kind words about my work. I don't currently offer formal tutorials, but I do occasionally stream my process on Twitch. I'd recommend checking out courses on Domestika and Skillshare - there are some great ones for developing illustration skills. Also, I learned a lot from books by James Gurney and Scott Robertson. Let me know if you have any specific techniques you're trying to master!",
            'is_read' => rand(0, 1) == 1,
            'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(5) : null,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ]);

        // 50% chance of having a continuing conversation
        if (rand(0, 1) == 1) {
            $createdAt = $createdAt->copy()->addDays(1);
            $message3 = Message::create([
                'thread_id' => $thread->id,
                'sender_id' => $sender->id,
                'recipient_id' => $recipient->id,
                'content' => "Thank you so much for these resources! I'll definitely check out the books and courses you mentioned. I'm particularly trying to improve my lighting and color theory. If you ever decide to offer tutorials in the future, I'd be the first to sign up!",
                'is_read' => rand(0, 1) == 1,
                'read_at' => rand(0, 1) == 1 ? $createdAt->copy()->addHours(2) : null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);
        }
    }
}
