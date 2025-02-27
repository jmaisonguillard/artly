<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\MessageThread;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get random users for sender and recipient
        $users = User::inRandomOrder()->limit(2)->get();

        if ($users->count() < 2) {
            $users = User::factory()->count(2)->create();
        }

        $sender = $users[0];
        $recipient = $users[1];

        // Get existing thread or create new one
        $thread = MessageThread::whereHas('participants', function ($query) use ($sender) {
            $query->where('user_id', $sender->id);
        })->whereHas('participants', function ($query) use ($recipient) {
            $query->where('user_id', $recipient->id);
        })->first();

        if (!$thread) {
            $thread = MessageThread::factory()->create();
            $thread->participants()->attach([$sender->id, $recipient->id]);
        }

        $created_at = $this->faker->dateTimeBetween('-1 month', 'now');

        // Determine if message is read
        $isRead = $this->faker->boolean(70); // 70% chance to be read
        $readAt = $isRead ? $this->faker->dateTimeBetween($created_at, 'now') : null;

        return [
            'thread_id' => $thread->id,
            'sender_id' => $sender->id,
            'recipient_id' => $recipient->id,
            'content' => $this->faker->paragraph(rand(1, 5)),
            'is_read' => $isRead,
            'read_at' => $readAt,
            'created_at' => $created_at,
            'updated_at' => $created_at,
        ];
    }

    /**
     * Indicate that the message has been read.
     *
     * @return Factory
     */
    public function read()
    {
        return $this->state(function (array $attributes) {
            $readAt = $this->faker->dateTimeBetween($attributes['created_at'], 'now');

            return [
                'is_read' => true,
                'read_at' => $readAt,
            ];
        });
    }

    /**
     * Indicate that the message has not been read.
     *
     * @return Factory
     */
    public function unread()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_read' => false,
                'read_at' => null,
            ];
        });
    }

    /**
     * Add an attachment to the message.
     *
     * @return Factory
     */
    public function withAttachment()
    {
        return $this->state(function (array $attributes) {
            $attachmentTypes = [
                'image/jpeg' => 'jpg',
                'image/png' => 'png',
                'application/pdf' => 'pdf',
                'application/msword' => 'doc',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
            ];

            $mimeType = $this->faker->randomElement(array_keys($attachmentTypes));
            $extension = $attachmentTypes[$mimeType];
            $fileName = $this->faker->word . '.' . $extension;

            return [
                'attachment_path' => 'message_attachments/' . $this->faker->uuid . '.' . $extension,
                'attachment_name' => $fileName,
                'attachment_type' => $mimeType,
            ];
        });
    }
}
