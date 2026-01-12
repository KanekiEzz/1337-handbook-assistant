import { NextResponse } from "next/server"

// export async function DELETE(
//   _: Request,
//   { params }: { params: { id: string } }
// ) {
//   const res = await fetch(`http://127.0.0.1:8080/data/${params.id}`, {
//     method: "DELETE",
//   })

//   if (!res.ok) {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 })
//   }

//   return NextResponse.json({ success: true })
// }


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const res = await fetch(`http://127.0.0.1:8080/data/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    return Response.json({ error: "Delete failed" }, { status: 500 })
  }

  return Response.json({ success: true })
}
