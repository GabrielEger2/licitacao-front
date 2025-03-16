import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoLinkedin,
} from 'react-icons/bi'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <div className="mx-auto space-y-8 px-4 pt-16 pb-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-xl font-bold">
              <h2>Invictus Engenharia</h2>
            </div>

            <p className="mt-4 max-w-xs">
              Excelência em Engenharia Elétrica, Segurança e Sustentabilidade
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <BiLogoFacebookCircle size={24} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <BiLogoInstagramAlt size={24} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>

                  <BiLogoLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Website</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#sobre-nos">Sobre Nós</a>
                </li>
                <li>
                  <a href="#projetos">Projetos</a>
                </li>
                <li>
                  <a href="#servicos">Serviços</a>
                </li>
                <li>
                  <a href="#contato">Contato</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Redes</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Linkedin</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium">Serviços</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>Engenharia Elétrica</li>
                <li>Segurança do Trabalho</li>
                <li>Projetos Ambientais</li>
                <li>Subestações de Energia</li>
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
          &copy; 2022. Invictus Engenharia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
