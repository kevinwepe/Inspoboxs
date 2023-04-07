<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Post;

class Like extends Model
{
    use HasFactory;

    protected $table = 'likes';

    public function user() {
        return $this->belongsTo(User::class,'id'  ,'user_id');
    }
}
