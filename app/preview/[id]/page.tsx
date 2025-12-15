import { redirect } from "next/navigation"

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Redirect to the API route that serves the HTML
  redirect(`/api/preview/${id}`)
}
