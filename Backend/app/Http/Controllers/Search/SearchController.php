<?php 

namespace App\Http\Controllers\Search;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Post;

class SearchController extends Controller {
    public function search(Request $request) {
       $find_post = Post::with(['user', 'comments.user'])->where('title' , 'LIKE',"%$request->title%")->get();

       if(count($find_post) > 0) {
        return response()->json($find_post,200);
       } else {
         return response()->json(Post::with(['user', 'comments.user'],400)->get());
       }
    }
}