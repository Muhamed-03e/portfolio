"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            data-slot="projects"
            className="relative w-full px-container py-16 md:py-24 xl:py-32"
            id="projects"
        >
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 mb-12 md:mb-16 xl:mb-20">
                    <BlurReveal>
                        <span className="title-counter">
                            [003]
                        </span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">
                            {dict.projectsTitle}
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="mt-2 md:mt-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight max-w-3xl">
                            {dict.projectsIntro}
                        </p>
                    </BlurReveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {content.projects.map((project: ProjectItem, index: number) => (
                        <BlurReveal key={project.id} delay={index * 100}>
                            <ProjectCard
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        </BlurReveal>
                    ))}
                </div>
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer bg-background border border-border/50 hover:border-foreground/30 transition-all duration-500 overflow-hidden rounded-2xl"
        >
            {/* Image Area */}
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

                {/* Top row: category + year */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                    <span className="text-[10px] xl:text-xs font-mono tracking-widest text-foreground/90 bg-background/70 backdrop-blur-sm border border-border/40 px-2.5 py-1 uppercase">
                        {project.category}
                    </span>
                    <span className="text-[10px] xl:text-xs font-mono text-foreground/70 bg-background/70 backdrop-blur-sm border border-border/40 px-2.5 py-1">
                        {project.year}
                    </span>
                </div>

                {/* Bottom: title */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 xl:p-7">
                    <h3 className="text-xl md:text-2xl xl:text-3xl font-black tracking-tight uppercase text-foreground leading-tight">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* Info strip below image */}
            <div className="border-t border-border/50 group-hover:border-foreground/20 transition-colors duration-500 px-4 xl:px-6 py-4 bg-background/50 backdrop-blur-sm">
                {/* Stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stack?.slice(0, 5).map((tech) => (
                        <span
                            key={tech}
                            className="text-[9px] xl:text-[10px] font-mono px-2 py-0.5 border border-border/40 bg-secondary/30 text-foreground/60 group-hover:text-foreground/80 group-hover:border-border/60 transition-colors duration-300 uppercase tracking-wider whitespace-nowrap"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.stack && project.stack.length > 5 && (
                        <span className="text-[9px] xl:text-[10px] font-mono px-2 py-0.5 text-foreground/40 whitespace-nowrap">
                            +{project.stack.length - 5}
                        </span>
                    )}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-foreground/40">
                        VIEW PROJECT
                    </span>
                    <span className="text-foreground/30 group-hover:text-foreground/80 transition-all duration-300 text-xs font-mono tracking-widest shrink-0 group-hover:translate-x-1">
                        →
                    </span>
                </div>
            </div>
        </div>
    );
});