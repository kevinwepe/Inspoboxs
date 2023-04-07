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
        $allPost = Post::with(['user'])->get();

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

   public function updatePosts(Request $request, $id) {

   
    $find_post = Post::find($id);

    if($find_post) {
        $validate = $request->validate([
            'title'=>['required'],
            'image'=>['required'],
            'description'=>['required']
           ]);

           $format_image = null;

           if($request->hasFile('image')){
               $storage = Storage::disk('posts_image');

               if($storage->exists($find_post->image)) {
                  $storage->delete($find_post->image);
               }
       
               $format_image = date("YMD") . '_' . Str::random(15) . '.' . $request->file('image')->getClientOriginalExtension();
               $storage->putFileAs(null ,$request->file('image'), $format_image,null);
            }
          }

          $updated = Post::where('id' ,$id)->update([
              'title'=>$request->title,
              'image'=>$format_image != null ? $format_image : $find_post->image ,
              'description'=>$request->description
          ]);

          if($updated) return response()->json($updated,200);

          return response()->json(['message'=>'failed'], 400);
    }

  
}