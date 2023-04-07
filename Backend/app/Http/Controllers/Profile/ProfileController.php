<?php 
namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

use App\Models\Post;

class ProfileController extends Controller {
    public function userPosts($id){
        try{
            $user_posts = Post::with(['user'])->where('user_id' ,$id)->get();
            return response()->json($user_posts);
        } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()]);
        }
    }
}