<?php

namespace Database\Factories;

use App\Models\CommissionFile;
use App\Models\Commission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommissionFile>
 */
class CommissionFileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CommissionFile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $commission = Commission::inRandomOrder()->first();

        if (!$commission) {
            $commission = Commission::factory()->create();
        }

        // Randomly choose if this is from client or artist
        $uploadedBy = $this->faker->randomElement([$commission->client_id, $commission->artist_id]);

        // Set file stage - match commission stage or earlier stage
        $stages = ['concept', 'sketch', 'lineart', 'coloring', 'final'];
        $stageIndex = array_search($commission->stage, $stages);
        $possibleStages = array_slice($stages, 0, $stageIndex + 1);
        $fileStage = $this->faker->randomElement($possibleStages);

        // Filename extensions based on stage
        $stageExtensionMap = [
            'concept' => ['jpg', 'png', 'pdf'],
            'sketch' => ['jpg', 'png', 'psd'],
            'lineart' => ['jpg', 'png', 'psd', 'ai'],
            'coloring' => ['jpg', 'png', 'psd', 'ai'],
            'final' => ['jpg', 'png', 'psd', 'ai', 'tif'],
        ];

        $extension = $this->faker->randomElement($stageExtensionMap[$fileStage]);
        $fileName = strtolower(str_replace(' ', '-', $commission->title)) . '-' . $fileStage . '.' . $extension;

        // For thumbnail, we'll just use a placeholder path in the factory
        // In a real application, you'd generate actual thumbnails
        $thumbnailPath = 'thumbnails/' . $fileName;

        return [
            'commission_id' => $commission->id,
            'uploaded_by' => $uploadedBy,
            'name' => $fileName,
            'path' => 'commission-files/' . $fileName,
            'mime_type' => $this->getMimeType($extension),
            'size' => $this->faker->numberBetween(50000, 5000000),  // 50KB - 5MB
            'thumbnail_path' => $thumbnailPath,
            'stage' => $fileStage,
            'is_current_version' => $fileStage === $commission->stage,
            'created_at' => $this->faker->dateTimeBetween($commission->created_at, 'now'),
        ];
    }

    /**
     * Helper to get mime type from extension
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
     * Indicate that the file is the current version.
     *
     * @return static
     */
    public function currentVersion()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_current_version' => true,
            ];
        });
    }

    /**
     * Indicate that the file is from the artist.
     *
     * @return static
     */
    public function fromArtist()
    {
        return $this->state(function (array $attributes) {
            $commission = Commission::find($attributes['commission_id']);
            return [
                'uploaded_by' => $commission->artist_id,
            ];
        });
    }

    /**
     * Indicate that the file is from the client.
     *
     * @return static
     */
    public function fromClient()
    {
        return $this->state(function (array $attributes) {
            $commission = Commission::find($attributes['commission_id']);
            return [
                'uploaded_by' => $commission->client_id,
            ];
        });
    }
}
