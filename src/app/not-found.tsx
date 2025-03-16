import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="">
          <div className="text-5xl font-dark font-bold">Em desenvolvimento</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Esta página ainda está sendo desenvolvida
          </p>
          <p className="mb-8">
            Não se preocupe, todo está sendo feito o mais rapido possivel
          </p>

          <Link
            href="/dashboard"
            className="px-4 cursor-pointer inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
          >
            Voltar
          </Link>
        </div>
      </div>
    </div>
  )
}
