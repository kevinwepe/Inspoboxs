<?php 

namespace App\Http\Controllers\Search;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Post;

class SearchController extends Controller {
    public function search(Request $request) {
       $find_post = Post::where('title' , '%like%' , $request->title)->get();

       if(count($find_post) > 0) {
        return response()->json($find_post);
       } else {
         return response()->json(Post::all());
       }
    }
}