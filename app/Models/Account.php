<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [
        'account_number',
        'account_type',
        'user_id',
        'branch_id',
    ];
    use HasFactory;
    // 1-M relation between user & account
    public function user(){
        return $this->belongsTo(User::class);
    }
    // 1-M relation between banks & account
    public function branch(){
        return $this->belongsTo(Branch::class);
    }
}
