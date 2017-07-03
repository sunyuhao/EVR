import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { AccueilService } from '../accueil.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {
title = 'test';
evaluations:Evaluation[];

  constructor( private router: Router,
    private accueilService: AccueilService) { }

  getEvaluations(): void {
    this.accueilService.getEvaluations().then(evaluations => this.evaluations = evaluations);
  }

  ngOnInit(): void {
    this.getEvaluations();
  }

}
