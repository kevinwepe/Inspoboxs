<?php 

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Post;
use App\Models\Comment;

use Illuminate\Support\Str;

class CommentController extends Controller {
    public function createComment(Request $request , $post_id) {
       $find_post = Post::find($post_id);
    }

    public function deleteComment($id){

    }
}