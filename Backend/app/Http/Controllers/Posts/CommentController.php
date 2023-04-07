<?php 

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Post;
use App\Models\Comment;

use Illuminate\Support\Str;

class CommentController extends Controller {
    public function createComment(Request $request) {
        try {

         if($request->header('Authorization')) {
             $create_comment = Comment::create([
                  'user_id'=>$request->user_id,
                  'post_id'=>$request->post_id,
                  'comment'=>$request->comment
             ]);

             if($create_comment) {
                 $all_posts = Post::with(['user', 'comments'])->get();

                 return response()->json($all_posts,200);
             }

             return response()->json(['message'=>'something went wrong'], 400);
         }

       }catch(DecryptException $e) {
        return response()->json(['message'=>$e->getMessage()],500);
       }
    }

    public function deleteComment($id){

    }
}