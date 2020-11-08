<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToDoRequest;
use App\Http\Resources\ToDoResource;
use App\Models\ToDo;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $todos = ToDoResource::collection(ToDo::latest()->get());

        return response()->json([
            'todos' => $todos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ToDoRequest  $request
     * @return ResponseFactory|\Illuminate\Http\Response
     */
    public function store(ToDoRequest $request)
    {
        $todo = ToDo::create($request->validated());

        return response([
            new ToDoResource($todo),
            Response::HTTP_ACCEPTED,
            'success' => 'New ToDo Added Successfully.',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param ToDo $todo
     * @return ToDoResource
     */
    public function show(Todo $todo)
    {
        return new ToDoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ToDoRequest $request
     * @param ToDo $todo
     * @return ResponseFactory|\Illuminate\Http\Response
     */
    public function update(ToDoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());

        return response([
            new ToDoResource($todo),
            Response::HTTP_ACCEPTED,
            'success' => 'ToDo Updated Successfully.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ToDo $todo
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response("ToDo Deleted Successfully", Response::HTTP_OK);
    }
}
