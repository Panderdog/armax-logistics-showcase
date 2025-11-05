import { Award, Shield, FileCheck, Briefcase } from "lucide-react";

const Competence = () => {
  const certifications = [
    {
      icon: Award,
      title: "Международная сертификация",
      description: "Сертификат соответствия ISO 9001:2015",
    },
    {
      icon: Shield,
      title: "Лицензия на перевозки",
      description: "Полный пакет разрешительных документов",
    },
    {
      icon: FileCheck,
      title: "Таможенное оформление",
      description: "Аккредитация для работы с таможней",
    },
    {
      icon: Briefcase,
      title: "Страховая защита",
      description: "Полисы страхования грузов CMR",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Компетентность и сертификаты
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Профессионализм, подтверждённый международными стандартами
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Наши сертификаты и лицензии
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы соответствуем всем международным требованиям и стандартам качества
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg text-center group"
              >
                <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <cert.icon className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm">{cert.description}</p>
              </div>
            ))}
          </div>

          {/* Certificates Display */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Документы компании
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-[3/4] rounded-xl bg-secondary border border-border hover:border-primary transition-all duration-300 hover:shadow-xl cursor-pointer group overflow-hidden"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <FileCheck className="h-16 w-16 text-primary/30 mx-auto mb-4 group-hover:text-primary transition-colors" />
                      <p className="text-sm text-muted-foreground">Сертификат #{item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Standards */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-secondary border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Наши профессиональные стандарты
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Соответствие международным стандартам ISO",
                  "Сертифицированные специалисты по логистике",
                  "Полное страхование грузов по CMR",
                  "Лицензии на все виды перевозок",
                  "Членство в ассоциациях перевозчиков",
                  "Регулярное повышение квалификации персонала",
                ].map((standard, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <p className="text-foreground">{standard}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Competence;
