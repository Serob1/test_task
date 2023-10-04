<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    public function test_authenticated_user_can_view_own_profile()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/user');

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'name',
                'surname',
                'email'
            ]);

        $response->assertJsonFragment([
            'email' => $user->email,
            'name' => $user->name,
            'surname' => $user->surname,
        ]);
    }

    public function test_unauthenticated_user_cannot_view_profile()
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson(['error' => 'Unauthenticated!']);
    }
}
