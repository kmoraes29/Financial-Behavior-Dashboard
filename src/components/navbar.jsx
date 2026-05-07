import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [active, setActive] = useState("Visão Geral");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [empresa, setEmpresa] = useState("TechPlus");
  const [periodo, setPeriodo] = useState("Abril/2025");

  const menuItems = [
    "Visão Geral",
    "Fluxo de Caixa",
    "Cenários",
    "Comportamento",
    "Relatórios",
    "Configurações",
  ];

  return (
    <nav className="relative bg-card border-b border-soft">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="flex items-center justify-start">
            <img
              src="/horizontefin-logo.png"
              alt="Horizonte Financeiro"
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setActive(item)}
                  aria-current={active === item ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    active === item
                      ? "bg-[#EEEAFE] text-[#4F46C7]"
                      : "text-[#1A1D29] hover:bg-[#F1F4FA] hover:text-[#4F46C7]"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div className="relative hidden xl:block">
              <label className="absolute left-4 top-2 text-[11px] font-medium text-[#6B7280]">
                Empresa
              </label>

              <select
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="h-[52px] w-[150px] appearance-none rounded-2xl border border-[#E6EAF2] bg-white px-4 pt-5 text-[11px] text-[#1A1D29] outline-none transition-all hover:bg-[#F7F9FC] focus:border-[#6C63FF]"
              >
                <option>Pizzaria LTDA</option>
                <option>TechPlus</option>
                <option>HackZero</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1D29]">
                <IoIosArrowDown />
              </span>
            </div>

            <div className="relative hidden xl:block">
              <label className="absolute left-4 top-2 text-[11px] font-medium text-[#6B7280]">
                Período
              </label>

              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="h-[52px] w-[150px] appearance-none rounded-2xl border border-[#E6EAF2] bg-white px-4 pt-5 text-[11px] text-[#1A1D29] outline-none transition-all hover:bg-[#F7F9FC] focus:border-[#6C63FF]"
              >
                <option>Maio/2025</option>
                <option>Abril/2025</option>
                <option>Março/2025</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1D29]">
                <IoIosArrowDown />
              </span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="size-10 rounded-full"
            />

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden rounded-md p-2 text-[#1A1D29] hover:bg-[#F1F4FA]"
            >
              {mobileOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-soft bg-card px-4 pb-4 pt-4">
          <div className="mb-4 space-y-3 border-b border-[#E6EAF2] pb-4">
            <div className="relative">
              <label className="absolute left-4 top-2 text-xs font-medium text-[#6B7280]">
                Empresa
              </label>

              <select
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className="h-[52px] w-full appearance-none rounded-2xl border border-[#E6EAF2] bg-white px-4 pt-5 text-sm text-[#1A1D29] outline-none focus:border-[#6C63FF]"
              >
                <option>Pizzaria LTDA</option>
                <option>TechPlus</option>
                <option>HackZero</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1D29]">
                <IoIosArrowDown />
              </span>
            </div>

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs font-medium text-[#6B7280]">
                Período
              </label>

              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="h-[52px] w-full appearance-none rounded-2xl border border-[#E6EAF2] bg-white px-4 pt-5 text-sm text-[#1A1D29] outline-none focus:border-[#6C63FF]"
              >
                <option>Maio/2025</option>
                <option>Abril/2025</option>
                <option>Março/2025</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1D29]">
                <IoIosArrowDown />
              </span>
            </div>
          </div>

          <div className="space-y-1 lg:hidden">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => {
                  setActive(item);
                  setMobileOpen(false);
                }}
                aria-current={active === item ? "page" : undefined}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-all duration-200 ${
                  active === item
                    ? "bg-[#EEEAFE] text-[#4F46C7]"
                    : "text-[#1A1D29] hover:bg-[#F1F4FA] hover:text-[#4F46C7]"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
