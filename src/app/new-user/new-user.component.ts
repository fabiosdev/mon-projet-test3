import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  // Méthode template  - On crée une méthode qui sera appelée dans le constructeur pour la population de cet objet
  /*initForm() {
    this.userForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      drinkPreference: ''
    });
  }*/
  // FormBuilder est une classe qui vous met à disposition des méthodes facilitant la création d'objet FormGroup
  // On utilise la méthode group() à l'intérieur de la méthode initForm() pour commencer à créer le formulaire
  // La méthode group prend comme argumet un objet ou les clés correspondent aux noms des controles souhaités et les valeurs correspondent aux valeurs par défaut de ces champs
  // Puisque l'objectif est d'avoir des champs vides au départ, chaque valeur ici correspond au string vide.

  // Méthode réactive : On importe les validators
  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required],
      hobbies: this.formBuilder.array([])
    });
    // plutot qu'un string simple, vous passez un array à chaque control. avec comme premier élément la valeur par défaut souhaitée et comme 2eme element le ou les Validators
    // Dans ce cas de figure tous les champs sont requis et la valeur du champ email doit être sous un format valable d'adresse mail
  }
  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstname'],
      formValue['lastname'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
    // La méthode onSubmitForm() récupère la value du formulaire et crée un nouvel objet User à partir de la valeur des controls du formulaire
    // Ensuite elle rajoute le nouvel utilisateur au service et navigue vers /users pour en montrer le résultat

  }

  getHobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }

}
