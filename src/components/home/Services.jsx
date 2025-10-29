import React from "react";
import { motion } from "framer-motion";
import { Globe, ShoppingCart, Smartphone, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom-built websites tailored to your brand, fully responsive and optimized for performance.",
    color: "from-blue-900 to-blue-700"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Powerful online stores with secure payment gateways, inventory management, and seamless checkout.",
    color: "from-red-600 to-red-700"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Beautiful interfaces that work flawlessly across all devices and screen sizes.",
    color: "from-blue-800 to-blue-600"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast loading times and superior SEO to help your business rank higher.",
    color: "from-red-700 to-red-800"
  },
  {
    icon: Shield,
    title: "Security & SSL",
    description: "Enterprise-grade security with SSL certificates, data encryption, and regular backups.",
    color: "from-blue-700 to-blue-500"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Continuous maintenance and support to keep your website running smoothly at all times.",
    color: "from-red-600 to-red-500"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive web solutions designed to elevate your business and deliver measurable results
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 h-full bg-white">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}