<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToMarkersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('markers', function (Blueprint $table) {
            $table->string('title');
            $table->string('dolgota');
            $table->string('shirota');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('markers', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('dolgota');
            $table->dropColumn('shirota');
        });
    }
}
