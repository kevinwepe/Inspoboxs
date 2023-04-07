<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Like;
use App\Models\Comment;

class Post extends Model
{
    use HasFactory;

    public function user() {
        return $this->hasOne(User::class, 'id' , 'user_id');
    }

    public function likes() {
        return $this->hasMany(Like::class,'post_id','id');
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'post_id' , 'id');
    }

    protected $table = 'posts';

    protected $fillable = [
        'id',
        'user_id',
        'title',
        'image',
        'description'
    ];
    
    protected $guarded = [
        'id'
    ];

    protected $hidden = [
        'id'
    ];
}
