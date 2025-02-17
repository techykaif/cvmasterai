export default function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <p className="text-gray-800 font-semibold">- {author}</p>
    </div>
  )
}

