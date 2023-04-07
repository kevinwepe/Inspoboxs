<?php 

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth; //use this library

use App\Models\Post;
use Illuminate\Support\Str;

class PostsController extends Controller {

    public function __construct() {
    }

   public function getAllPosts(Request $request) {
        $allPost = Post::with(['user', 'comments.user'])->get();

        if($allPost != null) {
            return response()->json($allPost, 200);
        } 
   }

   public function createPosts(Request $request) {
       try {

        $validate = Validator::make($request->all(), [
            'title'=>['required'],
            'image'=>['required'],
            'description'=>['required'],
            'user_id'=>['required']
        ]);

        if($validate->fails()) {
            return response()->json(['message'=>$validate->errors()->first()]);
        }

        $format_image = null;
 
        if($request->hasFile('image')){
           $storage = Storage::disk('posts_image');
 
           $format_image = date("YMD") . '_' . Str::random(15) . '.' . $request->file('image')->getClientOriginalExtension();
 
           $storage->putFileAs(null ,$request->file('image'), $format_image,null);
        }
 
        $created = Post::create([
         'title'=>$request->title,
         'image'=>$format_image,
         'description'=>$request->description,
         'user_id'=>$request->user_id
        ]);
 
        return response()->json($created);

       } catch(DecryptException $e) {
          return response()->json(['message'=>$e->getMessage()], 500);
       }
   }

   public function deletePosts($id) {
       if($id) {
          $deleted = Post::where('id',$id)->delete();

          if($deleted) {
            return response()->json(['message'=>'deleted!']);
          }
       }
   } 

   public function findPost($id) {
      $find_post = Post::with(['user'])->where('id',$id)->first();

      if($find_post) {
        return response()->json($find_post, 200);
      }

      return response()->json(['message'=>'not found'], 404);
   }

   public function updatePost(Request $request, $id) {

   
    $find_post = Post::find($id);

    if($find_post) {
        $validate = $request->validate([
            'title'=>['required'],
            'image'=>['required'],
            'description'=>['required']
           ]);

           $format_image = null;

           if($request->image && $request->hasFile('image')){
               $storage = Storage::disk('posts_image');

               if($storage->exists($find_post->image)) {
                  $storage->delete($find_post->image);
               }
       
               $format_image = date("YMD") . '_' . Str::random(15) . '.' . $request->file('image')->getClientOriginalExtension();
               $storage->putFileAs(null ,$request->file('image'), $format_image,null);
            }
          }

          $find_post->title = $request->title;
          $find_post->description = $request->description;
          $find_post->image = $format_image != null ? $format_image : $find_post->image;

          $find_post->save();

          if($find_post) return response()->json($find_post,200);

          return response()->json(['message'=>'failed'], 400);
    }

    public function deletePost(Request $request,$id) {
        $token = $request->header('Authorization');
        
        try {
            if($token && $id) {
                $delete_posts = Post::where('id',$id)->delete();
                if($delete_posts) {
                    return response()->json($id, 200);
                }
            }

            return response()->json(['message'=>'Unauthorized'], 401);

        } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()],500);
        }
    }

  
}