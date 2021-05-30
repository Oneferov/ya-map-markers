<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marker extends Model
{
    use HasFactory;

    function setData($data) {
        $this->title = $data['title'];
        $this->coords = $data['coords'];
        $this->userId = $data['userId'];

        $this->save();
    }
}
