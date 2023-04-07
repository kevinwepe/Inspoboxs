<?php 

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class AuthenticationController extends Controller {
    public function login(Request $request) {
        $validate = Validator::make($request->all() , [
            'email'=>['required'],
            'password'=>['required']
        ]);

        if($validate->fails()) {
            $errors = $validate->errors()->first();

            return response()->json($errors, 400);
        }
        //cek jika user ada
        $user = User::where('email' , $request->email)->first();

        if(!$user) {
            return response()->json(['message'=>'Authentication is failed'] , 401);
        }

        if(! $token = auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['message'=>'unauthorized'] , 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request) {

        $validate = Validator::make($request->all(),[
            'username'=>['required' , 'min:6'],
            'display_name'=>['required' , 'min:6'],
            'email'=>['required','unique:users'],
            'password'=>['required' , 'min:6'],
            'confirm'=>['required' , 'same:password']
        ]);

        if($validate->fails()) {
             $errors = $validate->errors()->first();

             return response($errors,400);
        }

        if(!str_contains($request->display_name , "@")) {
            return response()->json(['message'=>'Invalid display_name'],400);
        }

        $create = User::create([
            'username'=>$request->username,
            'display_name'=>$request->display_name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        
    }

    protected function respondWithToken($token) {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
        ]);
    }
}