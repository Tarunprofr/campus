<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Branches;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [    
            'name' => $this->faker->firstName,
            'branch_id' => Branches::all()->random()->id,
            'class' => $this->faker->numberBetween(1,12),
            'section' => $this->faker->randomElement(['A','B','C','D']),
            'join_date' => $this->faker->date('Y-m-d','now'),
            'status' => $this->faker->boolean,            
        ];
    }
}
