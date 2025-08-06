<?php

namespace App\Http\Controllers;

use App\Models\Instrument;
use App\Models\BorrowRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class InventoryController extends Controller
{
    public function index()
    {
        $instruments = Instrument::all();
        $borrowed = BorrowRecord::whereNull('returned_at')->with('instrument')->get();

        return view('inventory', compact('instruments', 'borrowed'));
    }

    public function getChartData()
    {
        $data = Instrument::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $available = $data['Available'] ?? 0;
        $borrowed = $data['Borrowed'] ?? 0;
        $maintenance = $data['Under Maintenance'] ?? 0;

        return response()->json([
            'labels' => ['Available', 'Borrowed', 'Under Maintenance'],
            'data' => [$available, $borrowed, $maintenance],
            'colors' => ['#9fbffe', '#2d62d3', '#ea5f5f']
        ]);
    }

    public function borrow(Request $request)
    {
        $request->validate([
            'student_id' => 'required|string',
            'equipment' => 'required|string',
            'equipment_no' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $datetime = $request->date . ' ' . $request->time;

        $instrument = Instrument::where('name', $request->equipment)
            ->where('equipment_no', $request->equipment_no)
            ->where('status', 'Available')
            ->first();

        if (!$instrument) {
            return response()->json(['error' => 'Instrument not available'], 400);
        }

        $borrow = BorrowRecord::create([
            'student_id' => $request->student_id,
            'student_name' => 'Walben P. Benogsudan', // Replace with lookup later
            'student_email' => $request->student_id . '@uic.edu.ph',
            'instrument_id' => $instrument->id,
            'reference' => 'P' . rand(1000000, 9999999),
            'borrowed_at' => $datetime,
        ]);

        $instrument->update(['status' => 'Borrowed']);

        return response()->json($borrow->load('instrument'));
    }

    public function getBorrowed()
    {
        return response()->json(
            BorrowRecord::whereNull('returned_at')
                ->with('instrument')
                ->get()
                ->map(function ($b) {
                    return [
                        'equipment_no' => $b->instrument->equipment_no,
                        'equipment' => $b->instrument->name,
                        'name' => $b->student_name,
                        'year_section' => 'BSIT-2B', // Could be from student table
                        'date' => $b->borrowed_at->format('m/d/y'),
                        'time' => $b->borrowed_at->format('g:i A'),
                        'reference' => $b->reference,
                    ];
                })
        );
    }

    public function getInstruments()
    {
        return response()->json(Instrument::all()->map(function ($i) {
            return [
                'equipment_no' => $i->equipment_no,
                'type' => $i->type,
                'equipment' => $i->name,
                'state' => $i->state,
                'status' => $i->status,
            ];
        }));
    }
}
