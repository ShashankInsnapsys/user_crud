<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'branch_name',
        'ifsc',
        'bank_id',
    ];
    use HasFactory;
    public function accounts(){
        return $this->hasMany(Account::class);
    }
    public function bank(){
        return $this->belongsTo(Bank::class);
    }
}
