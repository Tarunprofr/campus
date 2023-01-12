<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = "students";
    protected $fillable = ['name', 'branch_id', 'class', 'section','join_date','status'];

    public function branch(){
        return $this->belongsTo("App\Models\Branches", "branch_id");
    }
}
