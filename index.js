window.onload = () => {
	document.querySelector(".arrow-right").addEventListener("click", clickRight);
	document.querySelector(".arrow-left").addEventListener("click", clickLeft);
	document
		.querySelector(".send-button")
		.addEventListener("click", (e) => validateForm(e));
	document.querySelectorAll(".project").forEach((element) => {
		element.addEventListener("click", (e) => openModal(e));
		element.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				openModal(e);
			}
		});
	});
	document.body.addEventListener("click", (e) => closeModal(e));
	document.body.addEventListener("keyup", (e) => listenForEsc(e));
};

/** Cette fonction est appelée lorsque la personne clique sur la flèche droite du carrousel pour naviguer vers la droite */
function clickRight() {
	const currentLeft = parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);
	if (currentLeft < -270) {
		// si la valeur de gauche est inférieure à -270, arrêter de déplacer le contenu
		return;
	}
	let newValue = currentLeft - 270; // 270 prend en compte la taille de l'image ainsi que ses marges
	document.querySelector(".project-container").style.left = `${newValue}px`;
	switch (newValue) {
		case -270:
			document.querySelector(".project1").setAttribute("tabindex", "-1");
			document
				.querySelector(".project1-container")
				.setAttribute("aria-hidden", true);
			document.querySelector(".project4").removeAttribute("tabindex");
			document
				.querySelector(".project4-container")
				.removeAttribute("aria-hidden");
			break;
		case -540:
			document.querySelector(".project2").setAttribute("tabindex", "-1");
			document
				.querySelector(".project2-container")
				.setAttribute("aria-hidden", "true");
			document.querySelector(".project5").removeAttribute("tabindex");
			document
				.querySelector(".project5-container")
				.removeAttribute("aria-hidden");
			break;
		default:
			break;
	}
}

/** Cette fonction est appelée lorsque la personne clique sur la flèche gauche du carrousel pour naviguer vers la gauche */
function clickLeft() {
	const currentLeft = parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);
	if (currentLeft === 0) {
		// si la valeur de gauche est 0, retourner pour ne pas continuer à déplacer le contenu
		return;
	}
	let newValue = currentLeft + 270;
	document.querySelector(".project-container").style.left = `${newValue}px`;
	switch (newValue) {
		case -270:
			document.querySelector(".project5").setAttribute("tabindex", "-1");
			document
				.querySelector(".project5-container")
				.setAttribute("aria-hidden", "true");
			document.querySelector(".project2").removeAttribute("tabindex");
			document
				.querySelector(".project2-container")
				.removeAttribute("aria-hidden");
			break;
		case 0:
			document.querySelector(".project4").setAttribute("tabindex", "-1");
			document
				.querySelector(".project4-container")
				.setAttribute("aria-hidden", "true");
			document.querySelector(".project1").removeAttribute("tabindex");
			document
				.querySelector(".project1-container")
				.removeAttribute("aria-hidden");
			break;
		default:
			break;
	}
}

/** Valider le form avant de montrer la notification */
function validateForm(e) {
	/* preventDefault : empeche le refresh de la page */
	e.preventDefault();
	const nameField = document.getElementById("name");
	const emailField = document.getElementById("email");
	const messageField = document.getElementById("message");
	let isValid = true;

	if (nameField.value === "") {
		document.getElementById("name-error").innerHTML =
			"Pour envoyer le formulaire, il faut un prénom !";
		isValid = false;
	} else {
		document.getElementById("name-error").innerHTML = "";
	}

	if (emailField.value === "") {
		document.getElementById("email-error").innerHTML =
			"Pour envoyer le formulaire, il faut une adresse email !";
		isValid = false;
	} else {
		document.getElementById("email-error").innerHTML = "";
	}

	if (messageField.value === "") {
		document.getElementById("message-error").innerHTML =
			"Pour envoyer le formulaire, il faut un message !";
		isValid = false;
	} else {
		document.getElementById("message-error").innerHTML = "";
	}

	if (isValid) {
		// Envoyer le formulaire
		const form = e.target.closest('form');
		fetch(form.action, {
			method: 'POST',
			body: new FormData(form),
			headers: {
				'Accept': 'application/json'
			}
		})
		.then(response => {
			if (response.ok) {
				showNotification();
				form.reset();
			} else {
				throw new Error('Erreur lors de l\'envoi du formulaire');
			}
		})
		.catch(error => {
			document.querySelector(".notification").style.display = "flex";
			document.querySelector(".notification").innerHTML = "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer.";
			setTimeout(() => {
				document.querySelector(".notification").style.display = "none";
			}, 3000);
		});
	}
}

/** Cette fonction est appelée lorsque la personne clique sur le bouton d'envoi du formulaire de contact */
function showNotification() {
	document.getElementById("name-error").innerHTML = "";
	document.getElementById("email-error").innerHTML = "";
	document.getElementById("message-error").innerHTML = "";
	document.querySelector(".form-container").reset();
	document.querySelector(".notification").style.display = "flex";
	document.querySelector(".notification").innerHTML =
		"Le formulaire a été envoyé avec succès !";
	setTimeout(() => {
		document.querySelector(".notification").style.display = "none";
	}, 3000);
}

/** Écoute la touche Échap pour fermer la fenêtre modale */
function listenForEsc(e) {
	if (e.keyCode === 27) {
		closeModal(e);
	}
}

/** Cette fonction est appelée lorsque la personne clique sur n'importe quel projet du carrousel */
function openModal(e) {
	const project = e.currentTarget;
	const projectImg = project.querySelector(".project-img");
	const modalImg = document.querySelector(".modal-project-image");
	const modalTitle = document.getElementById("modal-header");
	
	document.querySelector(".modal-container").style.display = "flex";
	modalImg.src = projectImg.getAttribute("src");
	modalImg.alt = projectImg.getAttribute("alt");
	modalTitle.textContent = projectImg.getAttribute("alt");
	document.getElementById("modal-header").focus();
}

/** Cette fonction est appelée pour fermer la modale */
function closeModal(e) {
	// si le clic a eu lieu à l'intérieur des images du carrousel ou à l'intérieur de la modale, la modale ne se ferme pas
	if (
		e.target.className.includes("project") ||
		e.target.className === "modal"
	) {
		return;
	} else {
		document.querySelector(".modal-container").style.display = "none";
	}
}
