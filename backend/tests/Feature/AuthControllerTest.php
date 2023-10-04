<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'Password123!',
        ]);

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                'success' => [
                    'token',
                    'user' => [
                        'name',
                        'email',
                        'surname'
                    ]
                ]
            ]);

        $response->assertJsonFragment([
            'email' => $user->email,
        ]);
    }

    public function test_user_cannot_login_with_invalid_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'invalidpassword',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJson([
                'errors' => [
                    'wrongUser' => ['Invalid email or password!']
                ]
            ]);
    }

    
    public function test_user_can_register()
    {
        $response = $this->postJson('/api/register', [
            'email' => fake()->email(),
            'password' => 'Password123!',
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'name',
                'surname',
                'email'
            ]);

        $user = $response->json();

        $response->assertJsonFragment([
            'email' => $user['email'],
            'name' => $user['name'],
            'surname' => $user['surname'],
        ]);
    }

    public function test_user_registration_fails_with_invalid_data()
    {
        // Sending an empty request to simulate invalid data
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422)
            ->assertJson([
                'errors' => [
                'email' => ['The email field is required.'],
                'password' => ['The password field is required.'],
                'name' => ['The name field is required.'],
                'surname' => ['The surname field is required.'],
                ]
            ]);
    }
}
