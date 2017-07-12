import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {
  title = "TAM TAM"
  constructor(private router: Router) { }

  ngOnInit() {

    $('.working-situation-menu').mouseenter(function () {
      $(this).children('.expand').addClass('turn');
    });

    $('.working-situation-menu').mouseleave(function () {
      if ($(this).hasClass('open')) {
      } else {
        $(this).children('.expand').removeClass('turn');
      }
    });

    $('.working-situation-menu').click(function () {
      var $this = $(this);
      if ($this.hasClass('open')) {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');
        $this.removeClass('open');
        $this.children('.expand').removeClass('turn');
        $this.next().stop(true).slideUp("fast");
      }
      else {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');

        $this.addClass('open');
        $this.children('.expand').addClass('turn');
        $this.next().stop(true).slideDown("fast");
      }
    });

    $(".checkAll").click(function () {
      $(this).closest("div").find("input:checkbox").prop('checked', this.checked);
    });

    $(".checkSituation").click(function () {
      if (!$(this).is(':checked')) {
        $(this).closest("div").find(".checkAll").prop('checked', this.checked);
      }
    });

    $(".sub-menu").mCustomScrollbar({
      scrollInertia: 400,
      mouseWheel: { scrollAmount: 80 },
      theme: 'dark-3'
    });
  }

  gotoAccueil(): void {
    this.router.navigate(['/accueil']);
  }

}
