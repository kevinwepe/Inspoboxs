<?php 

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Post;
use Illuminate\Support\Str;

class LikeController extends Controller
{
    public function like($post_id) {
        $find_post = Post::find($post_id);

        if($find_post)
         {
            
            $find_like = Like::where('post_id' , $post_id)->where('user_id' , $find_post->user_id)->first();
            
            if($find_like) 
            {
                 //cek jika user unlike 
                Like::where('post_id',$post_id)->delete();
                return response()->json(['message'=>'unlike']);

             }
             else
             {
                 //cek jika user like 
                Like::create([
                    'post_id'=>$post_id,
                    'user_id'=>$find_post->user_id
                ]);

                return response()->json(['message'=>'like']);
             }

        }
    }
}