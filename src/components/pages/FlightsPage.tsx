import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Uular } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function FlightsPage() {
  const [flights, setFlights] = useState<Uular[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Uular[]>([]);
  const [loading, setLoading] = useState(true);
  const [departureFilter, setDepartureFilter] = useState('');
  const [arrivalFilter, setArrivalFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadFlights();
  }, []);

  useEffect(() => {
    filterFlights();
  }, [flights, departureFilter, arrivalFilter, dateFilter]);

  const loadFlights = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<Uular>('ucuslarr');
    setFlights(items);
    setLoading(false);
  };

  const filterFlights = () => {
    let filtered = [...flights];

    if (departureFilter) {
      filtered = filtered.filter(flight => 
        flight.departureLocation?.toLowerCase().includes(departureFilter.toLowerCase())
      );
    }

    if (arrivalFilter) {
      filtered = filtered.filter(flight => 
        flight.arrivalLocation?.toLowerCase().includes(arrivalFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(flight => {
        if (!flight.departureDate) return false;
        const flightDate = new Date(flight.departureDate);
        const filterDate = new Date(dateFilter);
        return flightDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredFlights(filtered);
  };

  const formatTime = (time: any) => {
    if (!time) return '--:--';
    if (typeof time === 'string') return time;
    return '--:--';
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Tarih belirtilmemiş';
    try {
      return format(new Date(date), 'd MMMM yyyy', { locale: tr });
    } catch {
      return 'Tarih belirtilmemiş';
    }
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
              Uçuşlarımız
            </h1>
            <p className="font-paragraph text-base lg:text-lg text-primary max-w-2xl mx-auto leading-relaxed">
              Geniş destinasyon ağımızla dünyanın her yerine ulaşın. Size en uygun uçuşu bulun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full bg-creamhighlight border-b border-primary/10">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <label className="font-paragraph text-sm text-primary mb-2 block">
                Kalkış Yeri
              </label>
              <Input
                type="text"
                placeholder="Şehir ara..."
                value={departureFilter}
                onChange={(e) => setDepartureFilter(e.target.value)}
                className="bg-background border-primary/20 text-primary font-paragraph"
              />
            </div>

            <div>
              <label className="font-paragraph text-sm text-primary mb-2 block">
                Varış Yeri
              </label>
              <Input
                type="text"
                placeholder="Şehir ara..."
                value={arrivalFilter}
                onChange={(e) => setArrivalFilter(e.target.value)}
                className="bg-background border-primary/20 text-primary font-paragraph"
              />
            </div>

            <div>
              <label className="font-paragraph text-sm text-primary mb-2 block">
                Tarih
              </label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-background border-primary/20 text-primary font-paragraph"
              />
            </div>
          </motion.div>

          {(departureFilter || arrivalFilter || dateFilter) && (
            <motion.button
              className="mt-4 px-6 py-2 border border-primary/30 bg-transparent text-primary font-paragraph text-sm transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                setDepartureFilter('');
                setArrivalFilter('');
                setDateFilter('');
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Filtreleri Temizle
            </motion.button>
          )}
        </div>
      </section>

      {/* Flights List */}
      <section className="w-full bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16">
          {loading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-softgraytext">Uçuşlar yükleniyor...</p>
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-softgraytext">
                {departureFilter || arrivalFilter || dateFilter 
                  ? 'Arama kriterlerinize uygun uçuş bulunamadı.'
                  : 'Henüz kayıtlı uçuş bulunmamaktadır.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-primary/10 bg-background hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 lg:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Flight Number */}
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Plane className="w-4 h-4 text-primary" />
                            <span className="font-paragraph text-xs text-softgraytext">
                              Uçuş No
                            </span>
                          </div>
                          <p className="font-heading text-xl text-primary">
                            {flight.flightNumber || 'N/A'}
                          </p>
                        </div>

                        {/* Route */}
                        <div className="lg:col-span-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-heading text-2xl lg:text-3xl text-primary mb-1">
                                {flight.departureLocation || 'N/A'}
                              </p>
                              <p className="font-paragraph text-sm text-softgraytext">
                                {formatTime(flight.departureTime)}
                              </p>
                            </div>

                            <div className="flex-shrink-0 px-4">
                              <div className="w-12 h-px bg-primary/30 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-primary/30 rotate-45"></div>
                              </div>
                            </div>

                            <div className="flex-1 text-right">
                              <p className="font-heading text-2xl lg:text-3xl text-primary mb-1">
                                {flight.arrivalLocation || 'N/A'}
                              </p>
                              <p className="font-paragraph text-sm text-softgraytext">
                                {formatTime(flight.arrivalTime)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-softgraytext" />
                              <span className="font-paragraph text-sm text-softgraytext">
                                {formatDate(flight.departureDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-softgraytext" />
                              <span className="font-paragraph text-sm text-softgraytext">
                                {flight.duration || 'Süre belirtilmemiş'}
                              </span>
                            </div>
                            {flight.aircraftType && (
                              <p className="font-paragraph text-sm text-softgraytext">
                                {flight.aircraftType}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="lg:col-span-2 text-right">
                          {flight.price && (
                            <p className="font-heading text-2xl lg:text-3xl text-primary">
                              ₺{flight.price.toLocaleString('tr-TR')}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
