<?php

namespace Tests\Feature;

use App\Models\QRModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class QrControllerTest extends TestCase
{
    public function test_authenticated_user_can_create_qr_code()
    {
        $user = User::factory()->create();
        
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/qr-code', [
            'content' => 'New QR Code',
            'background_color' => '#FFF',
            'fill_color' => '#000',
            'size' => 200
        ]);

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }

    public function test_unauthenticated_user_can_not_create_qr_code()
    {
        $response = $this->postJson('/api/qr-code', [
            'content' => 'New QR Code',
            'background_color' => '#FFF',
            'fill_color' => '#000',
            'size' => 200
        ]);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson(['error' => 'Unauthenticated!']);
    }

    public function test_create_qr_code_failure()
    {
        $user = User::factory()->create();
        
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/qr-code', [
            // 'content' => 'New QR Code',
            'background_color' => '1111111111',
            // 'fill_color' => '#000',
            'size' => 600
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function test_authenticated_user_can_view_own_qr_codes()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $qrCodes = QRModel::factory()->count(3)->create();

        $response = $this->getJson('/api/qr-code');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                    '*' => [
                        'id',
                        'content',
                        'background_color',
                        'fill_color',
                        'size'
                    ]
                 ]);

        $response->assertJsonFragment([
            'id' => $qrCodes[0]->id,
            'content' => $qrCodes[0]->content,
        ]);
    }

    public function test_unauthenticated_user_can_not_view_own_qr_codes()
    {
        $response = $this->getJson('/api/qr-code');

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson(['error' => 'Unauthenticated!']);
    }
}
