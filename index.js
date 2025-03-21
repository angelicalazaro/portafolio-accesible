window.onload = () => {
	document.querySelector(".arrow-right").addEventListener("click", clickRight);
	document.querySelector(".arrow-left").addEventListener("click", clickLeft);
	document
		.querySelector(".send-button")
		.addEventListener("click", showNotification);
	document.querySelectorAll(".project").for((element) => {
		element.addEventListener("click", (e) => openModal(e));
	});
	document.body.addEventListener("click", (e) => closeModal(e));
};

/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
	const currentLeft = Number.parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);
	if (currentLeft < -270) {
		//si el valor de izquierda es menor a -270, para de mover el contenido
		return;
	}
	const newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
	document.querySelector(".project-container").style.left = `${newValue}px`;
	switch (newValue) {
		case -270:
			document.querySelector(".project1").setAttribute("tabindex", "-1");
			document
				.querySelector(".project1-container")
				.setAttribute("aria-hidden", "true");
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

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
	const currentLeft = Number.parseInt(
		getComputedStyle(document.querySelector(".project-container")).left,
		10,
	);
	if (currentLeft === 0) {
		//si el valor de izquiera es 0, retornar para no seguir movierno el contenido
		return;
	}
	const newValue = currentLeft + 270;
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
				.removeAttribute("aria-hidden", "true");
			break;
		case 0:
			document.querySelector(".project4").setAttribute("tabindex", "-1");
			document
				.querySelector(".project4-container")
				.setAttribute("aria-hidden", "true");
			document.querySelector(".project1").removeAttribute("tabindex");
			document
				.querySelector(".project1-container")
				.removeAttribute("aria-hidden", "true");
			break;
		default:
			break;
	}
}

/** Esta funcion se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
	document.querySelector(".notification").style.display = "flex";
	setTimeout(() => {
		document.querySelector(".notification").style.display = "none";
	}, 3000);
}

/** Esta funcion se llama cuando la persona hace click en cualquier porjecto del carousel */
function openModal(e) {
	document.querySelector(".modal-container").style.display = "flex";
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
	// si el click occurio dentro del las imagenes del carousel o dentro del modal, no se cierra el modal
	if (
		e.target.className.includes("project") ||
		e.target.className === "modal"
	) {
		return;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		document.querySelector(".modal-container").style.display = "none";
	}
}
