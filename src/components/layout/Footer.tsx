import { BiLogoGmail, BiLogoWhatsapp } from 'react-icons/bi'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="mx-auto space-y-8 px-4 pt-16 pb-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-xl font-bold">
              <h2>R7Dital</h2>
            </div>

            <p className="mt-4 max-w-xs">
              Há mais de 10 anos no seguimento de T.I
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  href="https://api.whatsapp.com/send?phone=48991949697"
                  rel="noreferrer"
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <span className="sr-only">Whatsapp</span>

                  <BiLogoWhatsapp size={24} />
                </Link>
              </li>

              <li>
                <Link
                  type="email"
                  href="mailto:financeiro@r7digital.com.br"
                  className="transition hover:opacity-75"
                >
                  <span className="sr-only">Gmail</span>

                  <BiLogoGmail size={24} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Website</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    target="_blank"
                    href="https://r7-digital.lojaintegrada.com.br/pagina/sobre-nos.html"
                  >
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://r7-digital.lojaintegrada.com.br/"
                  >
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://r7-digital.lojaintegrada.com.br/pagina/trabalhe-conosco.html"
                  >
                    Trabalhe conosco
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Redes</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/R7Digital2017/"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/r7-digital/?originalSubdomain=br"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Serviços</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>Adesão de Atas</li>
                <li>Consultoria</li>
                <li>Licitações</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Desenvolvedor</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="https://www.egergabriel.com"
                    target="_blank"
                    className="transition hover:opacity-75"
                    rel="noreferrer"
                  >
                    Website
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.egergabriel.com/pt/contato"
                    target="_blank"
                    className="transition hover:opacity-75"
                    rel="noreferrer"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs">
          &copy; 2015. R7 Digital Informatica e Sevicos LTDA
        </p>
      </div>
    </footer>
  )
}
