<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BorrowRecord extends Model
{
    protected $fillable = ['student_id', 'student_name', 'student_email', 'instrument_id', 'reference', 'borrowed_at'];

    protected $dates = ['borrowed_at', 'returned_at'];

    public function instrument()
    {
        return $this->belongsTo(Instrument::class);
    }
}
