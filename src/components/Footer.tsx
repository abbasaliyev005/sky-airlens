export default function Footer() {
  return (
    <footer className="w-full bg-creamhighlight border-t border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Sky Airlens</h3>
            <p className="font-paragraph text-sm text-softgraytext leading-relaxed">
              Gökyüzünde güvenle yolculuk edin. Modern filomuz ve deneyimli ekibimizle hizmetinizdeyiz.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">İletişim</h3>
            <div className="space-y-2">
              <p className="font-paragraph text-sm text-softgraytext">
                E-posta: info@skyairlens.com
              </p>
              <p className="font-paragraph text-sm text-softgraytext">
                Telefon: +90 212 555 0000
              </p>
              <p className="font-paragraph text-sm text-softgraytext">
                Adres: İstanbul Havalimanı, Terminal 1
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg text-primary mb-4">Çalışma Saatleri</h3>
            <div className="space-y-2">
              <p className="font-paragraph text-sm text-softgraytext">
                Pazartesi - Cuma: 24 Saat
              </p>
              <p className="font-paragraph text-sm text-softgraytext">
                Cumartesi - Pazar: 24 Saat
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary/10">
          <p className="font-paragraph text-sm text-softgraytext text-center">
            © {new Date().getFullYear()} Sky Airlens. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
