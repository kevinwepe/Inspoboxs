<?php
namespace App\Helper\CheckToken;

class CheckToken {
    public static function checkToken($request) {
        $token = $request->header('Authorization');

         if(!$token) {
            return response()->json(['message'=>'Unauthorized'], 401);
         }
    }
}