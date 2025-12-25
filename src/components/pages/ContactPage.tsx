import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { LetiimFormuGnderimleri } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    messageContent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: LetiimFormuGnderimleri = {
      _id: crypto.randomUUID(),
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      subject: formData.subject,
      messageContent: formData.messageContent,
      submissionDateTime: new Date().toISOString()
    };

    await BaseCrudService.create('iletisimformugonderimleri', submission);

    setSubmitSuccess(true);
    setFormData({
      senderName: '',
      senderEmail: '',
      subject: '',
      messageContent: ''
    });
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-pastelblue">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl lg:text-6xl text-primary mb-6">
              İletişim
            </h1>
            <p className="font-paragraph text-base lg:text-lg text-primary max-w-2xl mx-auto leading-relaxed">
              Sorularınız, önerileriniz veya rezervasyon talepleriniz için bizimle iletişime geçin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="w-full bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-8">
                Bize Ulaşın
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-creamhighlight flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">
                      E-posta
                    </h3>
                    <p className="font-paragraph text-base text-softgraytext">
                      info@skyairlens.com
                    </p>
                    <p className="font-paragraph text-base text-softgraytext">
                      destek@skyairlens.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-creamhighlight flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">
                      Telefon
                    </h3>
                    <p className="font-paragraph text-base text-softgraytext">
                      +90 212 555 0000
                    </p>
                    <p className="font-paragraph text-base text-softgraytext">
                      +90 212 555 0001 (Rezervasyon)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-creamhighlight flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">
                      Adres
                    </h3>
                    <p className="font-paragraph text-base text-softgraytext leading-relaxed">
                      İstanbul Havalimanı<br />
                      Terminal 1, Kat 3<br />
                      Arnavutköy, İstanbul
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-primary/10">
                  <h3 className="font-heading text-xl text-primary mb-4">
                    Çalışma Saatleri
                  </h3>
                  <p className="font-paragraph text-base text-softgraytext mb-2">
                    Müşteri Hizmetleri: 7/24
                  </p>
                  <p className="font-paragraph text-base text-softgraytext">
                    Rezervasyon: 08:00 - 22:00
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-creamhighlight p-8 lg:p-10">
                <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-8">
                  Mesaj Gönderin
                </h2>

                {submitSuccess && (
                  <motion.div
                    className="mb-6 p-4 bg-secondary/20 border border-secondary"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="font-paragraph text-sm text-primary">
                      Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-paragraph text-sm text-primary mb-2 block">
                      Adınız Soyadınız *
                    </label>
                    <Input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                      className="bg-background border-primary/20 text-primary font-paragraph"
                      placeholder="Ad Soyad"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-primary mb-2 block">
                      E-posta Adresiniz *
                    </label>
                    <Input
                      type="email"
                      name="senderEmail"
                      value={formData.senderEmail}
                      onChange={handleChange}
                      required
                      className="bg-background border-primary/20 text-primary font-paragraph"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-primary mb-2 block">
                      Konu *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background border-primary/20 text-primary font-paragraph"
                      placeholder="Mesaj konusu"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm text-primary mb-2 block">
                      Mesajınız *
                    </label>
                    <Textarea
                      name="messageContent"
                      value={formData.messageContent}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-background border-primary/20 text-primary font-paragraph resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base py-6"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
