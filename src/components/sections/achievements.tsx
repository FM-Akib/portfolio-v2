"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { achievements } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Achievements() {
  return (
    <SectionWrapper
      id="achievements"
      title="Achievements & Awards"
      subtitle="Competitive programming highlights and recognitions"
      icon={<span>🏆</span>}
    >
      <div className="mx-auto grid max-w-4xl gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Card className="border-border bg-card text-card-foreground overflow-hidden">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={item.img}
                  alt={item.competitionTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {item.position}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-foreground text-sm font-semibold leading-tight">
                  {item.competitionTitle}
                </h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
