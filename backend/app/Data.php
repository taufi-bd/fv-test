<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'mobileNumber',
        'gender',
        'dateOfBirth',
        'comments',
    ];
}
