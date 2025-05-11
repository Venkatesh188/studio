import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";
import { Award, Brain, Users, Lightbulb } from "lucide-react";

const achievements = [
  { icon: Award, text: "Optimized packaging strategies, increasing taproom revenue by 20% for Allagash Brewing Company." },
  { icon: Brain, text: "Improved prediction of adverse events after cardiac surgery, outperforming national standards." },
  { icon: Users, text: "Led end-to-end AI development at Aosenuma, reducing operational costs by 30-40%." },
  { icon: Lightbulb, text: "Achieved 100% customer satisfaction by resolving complex COBOL/JCL/VSAM issues at Cognizant." },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Driven AI Professional & Innovator">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-foreground/90">
          <p className="text-lg">
            Hello! I'm Venkatesh Shivandi, an Applied Machine Intelligence professional with a passion for leveraging AI to solve real-world challenges and drive impactful change. My journey in AI is fueled by a deep curiosity and a commitment to continuous learning.
          </p>
          <p>
            With a Master's in Applied Machine Intelligence from Northeastern University (GPA: 3.94) and hands-on experience in roles spanning AI development, software engineering, and data science, I've honed a versatile skill set. I specialize in developing robust machine learning models, optimizing complex systems, and translating data into actionable insights.
          </p>
          <p>
            My expertise includes Python, SQL, NoSQL, and cloud platforms like AWS and Azure. I'm proficient in tools like Power BI, Tableau, and various machine learning libraries. I'm also a Microsoft Certified Azure Data Engineer Associate.
          </p>
          <p>
            I thrive in collaborative environments, leading cross-functional teams and spearheading innovation. My goal is to not only build advanced AI solutions but also to mentor and inspire others in the field.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src="https://picsum.photos/seed/venkateshwork/600/400"
            alt="Venkatesh Shivandi working on AI"
            width={600}
            height={400}
            className="rounded-lg relative shadow-[0_4px_20px_rgba(0,206,209,0.3)] dark:shadow-[0_4px_20px_rgba(0,255,255,0.35)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,206,209,0.5)] dark:hover:shadow-[0_8px_30px_rgba(0,255,255,0.6)]"
            data-ai-hint="person working computer"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Key Achievements</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-[0_4px_15px_rgba(0,206,209,0.15)] dark:shadow-[0_4px_15px_rgba(0,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(0,206,209,0.3)] dark:hover:shadow-[0_6px_20px_rgba(0,255,255,0.4)] transition-all duration-300 flex flex-col items-center text-center border border-primary/10">
              <achievement.icon className="h-10 w-10 text-primary mb-4" />
              <p className="text-sm text-card-foreground/80">{achievement.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
