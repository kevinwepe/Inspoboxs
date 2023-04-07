<?php 
namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use App\Models\Post;
use App\Models\User;

class ProfileController extends Controller {
    public function userPosts($id){
        try{
            $user_posts = User::with(['posts'])->where('id' , $id)->get();
            return response()->json($user_posts);
        } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()]);
        }
    }

    public function updateProfile(Request $request,$id) {
        $find_user = User::find($id);

         try {

            if($find_user) {
               $find_user->username = $request->username;
               $find_user->email = $request->email;
               $find_user->display_name = $request->display_name;

               $find_user->save();

               return response()->json($find_user);
            }

            return response()->json(['message'=>'not found'], 404);

         } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()],500);

         }
    }

    public function updateUserAvatar(Request $request,$id) {
         try {
            $find_user = User::with(['posts'])->where('id',$id)->first();

            $format_image = null;

            if($request->hasFile('avatar')) {
                $storage = Storage::disk('profile_image');

                if($find_user->profile != null && $storage->exists($find_user->profile)) {
                    $storage->delete($find_user->profile);
                }

                $format_image = Date("ymd") . '_' . Str::random(15) . '.' . $request->file('avatar')->getClientOriginalExtension();

                $storage->putFileAs(null, $request->file('avatar') , $format_image,[]);
            }

            $find_user->profile = $format_image != null ? $format_image : $find_user->profile;

            $find_user->save();

            return response()->json($find_user, 200);
             
         } catch(DecryptException $e) {
            return response()->json(['message'=>$e->getMessage()],500);

         }
    }
}