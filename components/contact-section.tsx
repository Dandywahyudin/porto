import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nama && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ nama: "", email: "", pesan: "" });
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
          CONTACT
        </h2>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all">
          {submitted ? (
            <div className="p-6 text-center bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-zinc-700 rounded-xl">
              <h4 className="font-extrabold text-black dark:text-white text-lg mb-2">
                Pesan Terkirim!
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Terima kasih telah menghubungi. Saya akan segera membalas
                pesan Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-black dark:text-white mb-1.5 block uppercase tracking-wider">
                  Nama
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full border-2 border-black dark:border-zinc-700 rounded-xl p-3 text-sm text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-900 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black dark:text-white mb-1.5 block uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border-2 border-black dark:border-zinc-700 rounded-xl p-3 text-sm text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-900 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black dark:text-white mb-1.5 block uppercase tracking-wider">
                  Pesan
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan tentang proyek Anda..."
                  value={formData.pesan}
                  onChange={(e) =>
                    setFormData({ ...formData, pesan: e.target.value })
                  }
                  className="w-full border-2 border-black dark:border-zinc-700 rounded-xl p-3 text-sm text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none bg-white dark:bg-zinc-900 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-xs py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-px active:translate-y-px cursor-pointer"
              >
                Kirim <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black dark:text-white leading-[1.1] tracking-tight transition-colors">
              Punya ide proyek? <br />
              Ayo diskusi dan <br />
              wujudkan bersama.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <InfoItem label="Email" href="mailto:dandywahyudin19@gmail.com" value="dandywahyudin@gmail.com" />
            <InfoItem label="Instagram" href="https://instagram.com/dandywahyudinn" value="@dandywahyudinn" />
            <InfoItem label="LinkedIn" href="https://linkedin.com/in/dandywahyudin" value="in/dandywahyudin" />
            <InfoItem label="Location" value="Kota Bandung, Indonesia" />
          </div>
        </div>
      </div>

      <footer className="border-t border-black dark:border-zinc-800 pt-6 mt-20 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-600 dark:text-zinc-400 font-medium gap-4 transition-colors">
        <div>© 2026 DW. — by Dandy Wahyudin.</div>
        <div className="flex items-center gap-6 text-xs text-zinc-800 dark:text-zinc-300 font-bold">
          <a href="https://linkedin.com/in/dandywahyudin" className="hover:text-black dark:hover:text-white hover:underline">
            LinkedIn
          </a>
          <a href="https://github.com/dandywahyudin" className="hover:text-black dark:hover:text-white hover:underline">
            GitHub
          </a>
          <a href="#readcv" className="hover:text-black dark:hover:text-white hover:underline">
            ReadCV
          </a>
        </div>
      </footer>
    </section>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
  href?: string;
};

function InfoItem({ label, value, href }: InfoItemProps) {
  return (
    <div className="border-l-2 border-black dark:border-zinc-600 pl-3.5 py-0.5">
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
        {label}
      </span>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm font-bold text-black dark:text-white hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-sm font-bold text-black dark:text-white">{value}</span>
      )}
    </div>
  );
}
