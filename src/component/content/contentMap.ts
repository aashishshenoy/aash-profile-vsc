import React from 'react';
import { ContentProps } from '../../types';
import AboutContent from './main/AboutContent';
import BlogContent from './blogs/BlogContent';
import ContactContent from './main/ContactContent';
import GalleryContent from './gallery/GalleryContent';
import ProjectsContent from './projects/ProjectsContent';
import SkillsContent from './main/SkillsContent';
import CodeContent from './code/CodeContent';
import UnifiedMarkdown from '../common/UnifiedMarkdown';
import MainContent from './main/MainContent';
import ChronologyContent from './main/ChronologyContent';

// Wrapper components for backward compatibility
const MarkdownContent: React.ComponentType<ContentProps> = (props) => {
  return React.createElement(UnifiedMarkdown, { sourceType: 'general', showBreadcrumbs: true, ...props });
};

const DSAMarkdownContent: React.ComponentType<ContentProps> = (props) => {
  return React.createElement(UnifiedMarkdown, { sourceType: 'dsa', showBreadcrumbs: true, ...props });
};

const BlogMarkdownContent: React.ComponentType<ContentProps> = (props) => {
  return React.createElement(UnifiedMarkdown, { sourceType: 'blog', showBreadcrumbs: true, ...props });
};

const ProjectMarkdownContent: React.ComponentType<ContentProps> = (props) => {
  console.log("ProjectMarkdownContent", props);
  return React.createElement(UnifiedMarkdown, { sourceType: 'project', showBreadcrumbs: true, ...props });
};

const GalleryMarkdownContent: React.ComponentType<ContentProps> = (props) => {
  return React.createElement(UnifiedMarkdown, { sourceType: 'gallery', showBreadcrumbs: true, ...props });
};

// Map component names to their actual components
const contentMap: Record<string, React.ComponentType<ContentProps>> = {
  'AboutContent': AboutContent,
  'ChronologyContent': ChronologyContent,
  'BlogContent': BlogContent,
  'ContactContent': ContactContent,
  'GalleryContent': GalleryContent,
  'ProjectsContent': ProjectsContent,
  'SkillsContent': SkillsContent,
  'CodeContent': CodeContent,
  'MainContent': MainContent,
  'MarkdownContent': MarkdownContent,
  'DSAMarkdownContent': DSAMarkdownContent,
  'BlogMarkdownContent': BlogMarkdownContent,
  'ProjectMarkdownContent': ProjectMarkdownContent,
  'GalleryMarkdownContent': GalleryMarkdownContent,
  'UnifiedMarkdown': UnifiedMarkdown
};

export default contentMap;
