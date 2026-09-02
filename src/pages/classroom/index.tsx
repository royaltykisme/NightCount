import '@css/vars.scss';
import './classroom.scss';
import { createIcons, icons } from 'lucide';
import { resolvePath } from '@utils/basepath';

interface ClassCard {
	code: string;
	name: string;
	teacher: string;
	room: string;
	color: string;
	icon: string;
}

const classes: ClassCard[] = [
	{ code: 'NET-101', name: 'Network Fundamentals', teacher: 'M. Alvarez', room: 'Room 204', color: 'lime', icon: 'network' },
	{ code: 'DSN-204', name: 'Digital Systems', teacher: 'A. Okafor', room: 'Studio 03', color: 'blue', icon: 'panels-top-left' },
	{ code: 'LIT-118', name: 'Modern Literature', teacher: 'R. Chen', room: 'Room 118', color: 'coral', icon: 'book-open' },
	{ code: 'LAB-301', name: 'Independent Lab', teacher: 'S. Patel', room: 'Open workspace', color: 'yellow', icon: 'flask-conical' },
];

function openClass(classCard: ClassCard): void {
	const blankTab = window.open('about:blank', '_blank');
	if (!blankTab) {
		console.warn(`Could not open ${classCard.code}: popup blocked`);
		return;
	}

	const frame = blankTab.document.createElement('iframe');
	frame.src = resolvePath('internal/newtab');
	frame.setAttribute('title', `${classCard.name} workspace`);
	frame.style.cssText = 'width:100%;height:100%;border:0;position:fixed;inset:0;';
	blankTab.document.title = `${classCard.name} | DaydreamX`;
	blankTab.document.body.style.margin = '0';
	blankTab.document.body.appendChild(frame);
}

function render(): void {
	const root = document.getElementById('classroom-app');
	if (!root) return;
	root.innerHTML = `
		<div class="classroom-shell">
			<header class="classroom-header">
				<div class="classroom-brand"><span class="brand-mark">D</span><span>Daydream classroom</span></div>
				<div class="header-actions"><span class="term-label">Fall / 2026</span><button class="icon-button" aria-label="Notifications" title="Notifications"><i data-lucide="bell"></i></button><button class="avatar" aria-label="Account">RK</button></div>
			</header>
			<div class="classroom-layout">
				<aside class="classroom-sidebar"><nav><a class="nav-item active" href="#"><i data-lucide="layout-dashboard"></i>Classes</a><a class="nav-item" href="#"><i data-lucide="calendar-days"></i>Calendar</a><a class="nav-item" href="#"><i data-lucide="archive"></i>Archive</a></nav><div class="sidebar-footer"><span>DAYDREAMX</span><span>v3.0</span></div></aside>
				<section class="classroom-content"><div class="content-heading"><div><p class="eyebrow">YOUR WORKSPACE</p><h1>Classes</h1><p class="subheading">Choose a class to open your private browsing workspace.</p></div><button class="add-class" title="Add class"><i data-lucide="plus"></i><span>Add class</span></button></div><div class="class-grid">${classes.map((classCard, index) => `
					<button class="class-card ${classCard.color}" data-class-index="${index}"><div class="class-card-top"><span class="class-code">${classCard.code}</span><i data-lucide="more-horizontal"></i></div><div class="class-icon"><i data-lucide="${classCard.icon}"></i></div><h2>${classCard.name}</h2><div class="class-meta"><span>${classCard.teacher}</span><span>${classCard.room}</span></div><span class="open-label">Open workspace <i data-lucide="arrow-up-right"></i></span></button>`).join('')}</div><div class="classroom-note"><i data-lucide="shield-check"></i><span>Every workspace opens in a blank tab with DaydreamX privacy controls.</span></div></section>
			</div>
		</div>`;
	root.querySelectorAll<HTMLButtonElement>('[data-class-index]').forEach(button => {
		button.addEventListener('click', () => openClass(classes[Number(button.dataset.classIndex)]));
	});
	createIcons({ icons });
}

document.addEventListener('DOMContentLoaded', render);