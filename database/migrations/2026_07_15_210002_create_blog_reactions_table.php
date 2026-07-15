<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // 'like', 'love', 'fire', 'clap', 'think'
            $table->string('ip_hash');
            $table->timestamps();
            $table->unique(['blog_post_id', 'type', 'ip_hash']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_reactions');
    }
};
